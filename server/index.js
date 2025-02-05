require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const app = express();

// middleware
const corsOptions = { 
  origin: ["http://localhost:5173", 
   "https://tech-hunt-point.web.app",
   "https://tech-hunt-point.firebaseapp.com" 
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u87o4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const productsCollection = client.db("techHuntDb").collection("products");
    const usersCollection = client.db("techHuntDb").collection("users");
    const reviewsCollection = client.db("techHuntDb").collection("reviews");
    const couponsCollection = client.db("techHuntDb").collection("coupons");

    const verifyAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email };
      const result = await usersCollection.findOne(query);
      if (!result || result?.role !== "Admin")
        return res
          .status(403)
          .send({ message: "Forbidden Access! Admin Only Actions!" });

      next();
    };

    const verifyModerator = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email };
      const result = await usersCollection.findOne(query);
      if (!result || result?.role !== "Moderator")
        return res
          .status(403)
          .send({ message: "Forbidden Access! Moderator Only Actions!" });
      next();
    };

    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send(isExist);
      }
      const result = await usersCollection.insertOne({
        ...user,
        role: "user",
        timestamp: Date.now(),
      });
      res.send(result);
    });

    app.get("/all-users/:email", verifyToken, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const query = { email: { $ne: email } };
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/users/role/:email",verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send({ role: result?.role || "user" });
    });

    app.patch(
      "/users/role/:email",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const email = req.params.email;
        const { role } = req.body;
        const filter = { email };
        const updateDoc = {
          $set: { role },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    app.patch("/users/subscribe/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const filter = { email };
      const updateDoc = { $set: { isSubscribed: true } };
      try {
        const user = await usersCollection.findOne(filter);
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (err) {
        console.error("Error updating subscription:", err);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    app.get("/users/subscription/:email", async (req, res) => {
      const email = req.params.email;
      try {
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res
            .status(404)
            .send({ isSubscribed: false, error: "User not found" });
        }
        res.send({ isSubscribed: user?.isSubscribed || false });
      } catch (err) {
        console.error("Error fetching subscription status:", err);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // Generate jwt token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.post("/products", verifyToken, async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const { status, searchTerm } = req.query;
      const query = {
        ...(status && { status }),
        ...(searchTerm && {
          tags: { $regex: searchTerm, $options: "i" },
        }),
      };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });
    
    app.get("/products/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const product = await productsCollection.findOne(query);
      res.send(product);
    });

    app.post("/products/:id", verifyToken, async (req, res) => {
      const productId = req.params.id;
      const { description, rating, reviewerName,
        reviewerImage } = req.body;
      const newReview = {
        productId: new ObjectId(productId),
        description,
        rating,
        reviewerName,
        reviewerImage,        
      };
      const result = await reviewsCollection.insertOne(newReview);
      res.send(result);
    });

    app.get("/reviews/:id",  verifyToken, async (req, res) => {
      const productId = req.params.id;
      const query = { productId: new ObjectId(productId) };
      const reviews = await reviewsCollection.find(query).toArray();
      res.send(reviews);
    });

    app.get("/my-products/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { "user.email": email };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/products/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const { status, ...otherUpdates } = req.body;
      const query = { _id: new ObjectId(id) };
      const product = await productsCollection.findOne(query);

      if (status) {
        if (!["Accepted", "Rejected", "Featured"].includes(status)) {
          return res.status(400).send({ message: "Invalid status update" });
        }
      if (product.status === status) {
          return res
            .status(409)
            .send({ message: `Product is already ${status}` });
        }
      }
      const updateDoc = { $set: { ...otherUpdates } };
      if (status) {
        updateDoc.$set.status = status; 
      }
      const result = await productsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/products/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/products/vote/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const { userEmail } = req.body;
      const filter = { _id: new ObjectId(id) };
      const product = await productsCollection.findOne(filter);
      if (!product.voters) {
        await productsCollection.updateOne(filter, { $set: { voters: [] } });
      }
      const hasVoted = product.voters.includes(userEmail);
      if (hasVoted) {
        return res.status(400).json({ error: "You have already voted for this product." });
      }
      const updateDoc = {
        $inc: { votes: 1 },
        $push: { voters: userEmail },
      };
    
      const result = await productsCollection.updateOne(filter, updateDoc);
      return res.send(result);
    });
    

    app.patch("/products/report/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const { userEmail } = req.body;
      const filter = { _id: new ObjectId(id) };
      const product = await productsCollection.findOne(filter);
      if (!product.reporters) {
        await productsCollection.updateOne(filter, { $set: { reporters: [] } });
      }
    
      const hasReported = product.reporters?.includes(userEmail);
      if (hasReported) {
        return res.status(400).json({ error: "You have already reported this product." });
      }
    
      const updateDoc = {
        $inc: { reports: 1 },
        $push: { reporters: userEmail },
      };
    
      const result = await productsCollection.updateOne(filter, updateDoc);
      return res.send(result);
    });
    

   app.get("/reported", verifyToken, verifyModerator, async (req, res) => {
    const reportedProducts = await productsCollection.aggregate([
      {
        $match: { reports: { $gt: 0 } }, 
      },
      {
        $project: { 
          name: 1,
        },
      },
    ]).toArray();
    res.send(reportedProducts);
    });
    
    //manage coupons
    app.get("/coupons", verifyToken, async (req, res) => {
      const result = await couponsCollection.find().toArray();
      res.send(result);
    });
    app.post("/coupons", async (req, res) => {
      const coupon = req.body;
      const result = await couponsCollection.insertOne(coupon);
      res.send(result);
    });

    app.put("/coupons/:id",verifyToken,verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const updates = req.body;
      const result = await couponsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updates }
      );
      res.send(result);
    });

    app.delete("/coupons/:id", verifyToken,verifyAdmin,async (req, res) => {
      const id = req.params.id;
      const result = await couponsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    //admin statistic
    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const products = await productsCollection.countDocuments();
      const users = await usersCollection.estimatedDocumentCount();
      const reviews = await reviewsCollection.estimatedDocumentCount();

      res.send({
        users,
        products,
        reviews,
      });
    });
  } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from tech hunt point Server..");
});

app.listen(port, () => {
  console.log(`tech hunt point is running on port ${port}`);
});

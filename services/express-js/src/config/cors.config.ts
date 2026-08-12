import cors from 'cors';

const corsConfig = cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  // methods: ["GET", "POST", "PATCH", "DELETE"]
  // credentials: true, // For allowing cookies
});

export default corsConfig;
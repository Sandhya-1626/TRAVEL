const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sample data for travel engine (In a real app, this would call an AI API or a DB)
const touristPlaces = {
    "Paris": [
        { name: "Eiffel Tower", interest: "history", description: "Iconic iron lattice tower." },
        { name: "Louvre Museum", interest: "history", description: "World's largest art museum." },
        { name: "Montmartre", interest: "culture", description: "Historic hill known for its artistic history." },
        { name: "Seine River Cruise", interest: "relaxation", description: "Scenic boat tour." }
    ],
    "Tokyo": [
        { name: "Shibuya Crossing", interest: "shopping", description: "World's busiest pedestrian crossing." },
        { name: "Senso-ji Temple", interest: "history", description: "Ancient Buddhist temple." },
        { name: "Shinjuku Gyoen", interest: "nature", description: "Large park and garden." },
        { name: "Akihabara", interest: "shopping", description: "Electronics and anime hub." }
    ],
    "New York": [
        { name: "Central Park", interest: "nature", description: "Huge green space in Manhattan." },
        { name: "Times Square", interest: "shopping", description: "Bright lights and theater." },
        { name: "Metropolitan Museum of Art", interest: "history", description: "World-class art museum." },
        { name: "Brooklyn Bridge", interest: "adventure", description: "Walk across the iconic bridge." }
    ]
};

const restaurants = {
    "Paris": [
        { name: "Le Jules Verne", cuisine: "French Fine Dining", price: "High" },
        { name: "L'As du Fallafel", cuisine: "Street Food", price: "Low" }
    ],
    "Tokyo": [
        { name: "Sukiyabashi Jiro", cuisine: "Sushi", price: "High" },
        { name: "Ichiran Ramen", cuisine: "Ramen", price: "Medium" }
    ]
};

app.post('/api/itinerary', (req, res) => {
    const { destination, budget, days, startDate, interests, startLocation } = req.body;

    if (!destination || !days) {
        return res.status(400).json({ error: "Destination and days are required" });
    }

    // Simple generation logic
    const itinerary = [];
    const places = touristPlaces[destination] || [
        { name: `${destination} City Center`, interest: "general", description: "Explore the heart of the city." },
        { name: "Local Landmark", interest: "history", description: "A must-visit spot." },
        { name: "Main Park", interest: "nature", description: "Beautiful outdoor area." },
        { name: "Popular Street", interest: "shopping", description: "Great for souvenirs." }
    ];

    for (let i = 1; i <= days; i++) {
        const dayPlaces = [
            places[(i * 0) % places.length],
            places[(i * 1) % places.length]
        ].filter((v, i, a) => a.indexOf(v) === i); // Unique

        itinerary.push({
            day: i,
            title: `Exploration Day ${i}`,
            activities: dayPlaces.map(p => ({
                time: "10:00 AM",
                place: p.name,
                description: p.description
            })),
            meals: [
                { type: "Lunch", suggestion: "Try local street food", restaurant: "Local Bistro" },
                { type: "Dinner", suggestion: "Famous local delicacy", restaurant: "Top Rated Restaurant" }
            ],
            travelTip: "Use public transport for better experience."
        });
    }

    const budgetBreakdown = {
        accommodation: budget * 0.4,
        food: budget * 0.3,
        activities: budget * 0.2,
        emergency: budget * 0.1
    };

    res.json({
        destination,
        days,
        itinerary,
        budgetBreakdown,
        weather: "Sunny, 22°C - 28°C",
        bestTime: "March to May",
        hotels: [
            { name: "Grand Luxe Hotel", type: "High", price: "£££" },
            { name: "Comfort Inn", type: "Medium", price: "££" },
            { name: "Hostel World", type: "Low", price: "£" }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

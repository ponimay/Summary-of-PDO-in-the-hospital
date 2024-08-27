
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Определение схемы и модели для DepartmentSummary
const DepartmentSummarySchema = new mongoose.Schema({
    DepartmentName: { type: String, required: true },
    PreviousDayCount: { type: Number, required: true },
    Admissions: { type: Number, required: true },
    Hospitalizations: { type: Number, required: true },
    Refusals: { type: Number, required: true },
    Discharges: { type: Number, required: true },
    Deaths: { type: Number, required: true },
    CurrentDayCount: { type: Number, required: true },
    ReportDateFrom: { type: Date, required: true },
    ReportDateTo: { type: Date, required: true }
});

const DepartmentSummary = mongoose.model('DepartmentSummary', DepartmentSummarySchema);

// Middleware
app.use(cors());
app.use(express.json());



// API маршруты
app.get('/api/reports', async (_req, res) => {
    try {
        const reports = await DepartmentSummary.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/reports', async (req, res) => {
    try {
        const newReport = new DepartmentSummary(req.body);
        await newReport.save();
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Обновить отчет
app.put('/api/reports/:id', async (req, res) => {
    try {
        const updatedReport = await DepartmentSummary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/reports/:id', async (req, res) => {
    try {
        await DepartmentSummary.findByIdAndDelete(req.params.id);
        res.json({ message: 'Report deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client')));

// All other GET requests not handled before will return our React app
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

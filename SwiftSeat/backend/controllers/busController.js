// controllers/busController.js

const Bus = require('../models/Bus');

// ✅ Create a new bus with 40 seats
exports.createBus = async (req, res) => {
  try {
    const { busName } = req.body;

    // Optional: Prevent duplicate bus names
    const existingBus = await Bus.findOne({ busName });
    if (existingBus) {
      return res.status(409).json({ message: 'Bus already exists' });
    }

    const seats = Array.from({ length: 40 }, (_, i) => ({
      seatNo: i + 1,
      booked: false,
      userEmail: ''
    }));

    const bus = new Bus({ busName, seats });
    await bus.save();

    res.status(201).json({ message: 'Bus created', bus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating bus' });
  }
};

// ✅ Get all buses (for dashboard list)
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({}, 'busName _id');
    res.status(200).json({ buses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching buses' });
  }
};

// ✅ Get seat info for a specific bus
exports.getSeats = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    res.status(200).json(bus.seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching seats' });
  }
};

// ✅ Book a seat
exports.bookSeat = async (req, res) => {
  const { seatNos, userEmail } = req.body;
  const { busId } = req.params;
  console.log("SEATNO",seatNos)
  try {
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    for(let i = 0; i< seatNos.length; i++) {
  let seat = bus.seats.find((s) => s.seatNo === seatNos[i]);
  console.log("SEATTT", seat)
    if (!seat) return res.status(404).json({ message: 'Seat not found' });

    if (seat.booked) return res.status(400).json({ message: 'Seat already booked' });

    seat.booked = true;
    seat.userEmail = userEmail;
    }
   

    await bus.save();
    res.status(200).json({ message: 'Seat booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while booking seat' });
  }
};

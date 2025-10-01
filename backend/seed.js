import db from './db.js';



db.exec(`DELETE FROM reviews; DELETE FROM favorites; DELETE FROM colleges;`);


const seed = [
{ name: 'ABC Engineering College', location: 'Hyderabad', course: 'Computer Science', fee: 120000 },
{ name: 'XYZ Institute of Technology', location: 'Bangalore', course: 'Electronics', fee: 100000 },
{ name: 'Sunrise Business School', location: 'Chennai', course: 'MBA', fee: 150000 },
{ name: 'Greenfield Medical College', location: 'Hyderabad', course: 'MBBS', fee: 250000 }
];


const insert = db.prepare(`INSERT INTO colleges (name, location, course, fee) VALUES (@name, @location, @course, @fee)`);
const tx = db.transaction((rows) => rows.forEach(r => insert.run(r)));
tx(seed);


console.log('Seeded colleges:', seed.length);
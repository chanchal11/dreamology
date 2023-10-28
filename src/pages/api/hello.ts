import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { OpenAI } from 'openai';

type Dream = {
  typeOfDream: string;
  prediction: string;
  thingsToDoIfHaveToAvoidIt: string;
  details: string;
};

const openai = new OpenAI({
  apiKey: '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' // process.env.OPEN_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle POST request to save dream details
    const  dreamDetails:any  =  'lion chasing me'; //req.body;

    // Call OpenAI API
    const generatedText:any = await generateTextFromOpenAI(dreamDetails);

    // Save dream details and OpenAI output to SQLite DB
    // saveDreamDetailsToDB({ ...generatedText, details: dreamDetails })
    //   .then(() => {
        res.status(200).json({ message: 'Dream details saved successfully', generatedText });
      // })
      // .catch((error) => {
      //   res.status(500).json({ message: 'Error saving dream details', error });
      // });
  } else if (req.method === 'POST') {
    // Handle GET request to retrieve dream or list of dreams
    const dreamId:any = req.query.id; // Assuming you have a query parameter for dream ID

    if (dreamId) {
      // Retrieve a specific dream by ID
      getDreamById(dreamId)
        .then((dream) => {
          if (dream) {
            res.status(200).json(dream);
          } else {
            res.status(404).json({ message: 'Dream not found' });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: 'Error retrieving dream', error });
        });
    } else {
      // Retrieve a list of dreams
      getAllDreams()
        .then((dreams) => {
          res.status(200).json(dreams);
        })
        .catch((error) => {
          res.status(500).json({ message: 'Error retrieving dreams', error });
        });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function generateTextFromOpenAI(dreamDetails: Dream): Promise<string> {
  
  // Set up OpenAI completion parameters
  const prompt = `Dream details:\nType of Dream: ${dreamDetails.typeOfDream}\nPrediction: ${dreamDetails.prediction}\nThings to do to avoid the dream: ${dreamDetails.thingsToDoIfHaveToAvoidIt}\n\nGenerated dream:`;
  const response = await openai.completions.create({
    model: 'text-davinci-002',
    prompt,
    max_tokens: 1024,
  });

  // Extract and return the generated text from OpenAI response
  const generatedText = response.choices[0].text.trim();
  return generatedText;
}

// Rest of the code for saveDreamDetailsToDB, getDreamById, and getAllDreams functions remains the same as before

function saveDreamDetailsToDB(dreamDetails: Dream): Promise<void> {
  return new Promise((resolve, reject) => {
    // Connect to SQLite DB
    const db = new sqlite3.Database('your-database-file.db');

    // Insert dream details into the dreams table
    const insertQuery = `INSERT INTO dreams (typeOfDream, prediction, thingsToDoIfHaveToAvoidIt) VALUES (?, ?, ?)`;
    const { typeOfDream, prediction, thingsToDoIfHaveToAvoidIt } = dreamDetails;
    db.run(
      insertQuery,
      [typeOfDream, prediction, thingsToDoIfHaveToAvoidIt],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );

    // Close the database connection
    db.close();
  });
}

function getDreamById(dreamId: string): Promise<Dream | null> {
  return new Promise((resolve, reject) => {
    // Connect to SQLite DB
    const db = new sqlite3.Database('your-database-file.db');

    // Retrieve dream by ID from the dreams table
    const selectQuery = `SELECT * FROM dreams WHERE id = ?`;
    db.get(selectQuery, [dreamId], function (error, row:any) {
      if (error) {
        reject(error);
      } else {
        resolve(row ? row : null);
      }
    });

    // Close the database connection
    db.close();
  });
}

function getAllDreams(): Promise<Dream[]> {
  return new Promise((resolve, reject) => {
    // Connect to SQLite DB
    const db = new sqlite3.Database('your-database-file.db');

    // Retrieve all dreams from the dreams table
    const selectQuery = `SELECT * FROM dreams`;
    db.all(selectQuery, function (error, rows) {
      if (error) {
        reject(error);
      } else {
        const dreams: Dream[] = rows.map((row:any) => ({
          typeOfDream: row.typeOfDream,
          prediction: row.prediction,
          thingsToDoIfHaveToAvoidIt: row.thingsToDoIfHaveToAvoidIt,
          details: row.details,
        }));
        resolve(dreams);
      }
    });

    // Close the database connection
    db.close();
  });
}
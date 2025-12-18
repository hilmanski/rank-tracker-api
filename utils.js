import fs from 'fs';
import path from 'path';

// Function to read and parse .env file
export function loadEnv(key) {
  const envPath = path.resolve(process.cwd(), '.env');
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    });
    return envVars[key];
  } catch (error) {
    console.error('Error reading .env file:', error.message);
    return null;
  }
}
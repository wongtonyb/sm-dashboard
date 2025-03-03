const { SSMClient, GetParametersByPathCommand } = require('@aws-sdk/client-ssm');
const axios = require('axios');
const fs = require('fs');

// Initialize SSM client
const ssmClient = new SSMClient({ region: 'us-east-1' });

async function createEnvFile() {
    try {
      // Get parameters by path
      const params = {
        Path: '/sm-dashboard/.env/',
        Recursive: true,
        WithDecryption: true
      };
      
      const command = new GetParametersByPathCommand(params);
      const response = await ssmClient.send(command);
      
      // Create .env file content
      let envContent = '';
      response.Parameters.forEach(param => {
        // Extract parameter name from the path
        const paramName = param.Name.split('/').pop();
        envContent += `${paramName}=${param.Value}\n`;
      });
      
      // Write to .env file
      fs.writeFileSync('.env', envContent);
      console.log('.env file created successfully');
    } catch (error) {
      console.error('Error creating .env file:', error);
    }
}

// Check if running on EC2 using axios to query the metadata service
async function checkIfEC2() {
  try {
    // Set a short timeout to quickly determine if we're on EC2
    const response = await axios.get('http://169.254.169.254/latest/meta-data/instance-id', {
      timeout: 1000
    });
    return response.data; // Return the instance ID
  } catch (error) {
    return false; // Not running on EC2 or cannot access metadata service
  }
}

// Main function using async/await
async function main() {
  const instanceId = await checkIfEC2();
  if (instanceId) {
    console.log('Running on EC2 instance:', instanceId);
    await createEnvFile();
  } else {
    console.log('Not running on EC2, skipping production setup');
  }
}

main().catch(err => console.error('Error:', err));

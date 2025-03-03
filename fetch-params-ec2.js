const AWS = require('aws-sdk');
const fs = require('fs');
const metadata = new AWS.MetadataService();
const ssm = new AWS.SSM({ region: 'us-east-1' }); // Add this line and specify your region

async function createEnvFile() {
    try {
      // Get parameters by path
      const params = {
        Path: '/sm-dashboar/.env/',
        Recursive: true,
        WithDecryption: true
      };
      
      const response = await ssm.getParametersByPath(params).promise();
      
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

// Use a promise-based approach for metadata
function checkIfEC2() {
  return new Promise((resolve, reject) => {
    metadata.request('/latest/meta-data/instance-id', (err, data) => {
      if (!err && data) {
        resolve(data); // Running on EC2
      } else {
        resolve(false); // Not running on EC2
      }
    });
  });
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

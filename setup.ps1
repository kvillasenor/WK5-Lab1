Write-Host "Installing root dependencies..."
npm install

Write-Host "Installing client dependencies..."
npm install --prefix client

Write-Host "Installing server dependencies..."
npm install --prefix server

Write-Host "Setup complete. Run 'npm run dev' to start the application."

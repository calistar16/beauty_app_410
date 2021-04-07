# Base the image off of the NodeJS image
FROM node:latest

# Set the working directory to be the HOME directory
WORKDIR D:\BYU\Winter2021\IT410\beauty_app_410

# Copy our application files to the image
COPY ./ /

# Start the container running our Node app
CMD ["node", "index"]
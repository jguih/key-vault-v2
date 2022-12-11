# Key Vault

A Game Store Project

## Gallery
<p align=center>
  
  ### Home Page
  
  ![Screenshot](./images/Home.png)
  
  ### Game Page
  
  ![Screenshot](./images/GamePage.png)
  
  ### Game Search Page (Superior)
  
  ![Screenshot](./images/GameSearchPage1.png)
  
  ### Game Search Page (Inferior)
  
  ![Screenshot](./images/GameSearchPage2.png)
  
  ### Game Admin Page (Superior)
  
  ![Screenshot](./images/GameAdmin1.png)
  
  ### Game Admin Page (Inferior)
  
  ![Screenshot](./images/GameAdmin2.png)
  
  ### Game Admin Page (Filled Superior)
  
  ![Screenshot](./images/GameAdminFilled1.png)
  
  ### Game Admin Page (Filled Inferior)
  
  ![Screenshot](./images/GameAdminFilled2.png)
  
  ### Game Admin Page IGDB Modal
  
  ![Screenshot](./images/GameAdminIGDB.png)
  
</p>

## How to Run This Project

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Local Env Variables

In order to use the IGDB integration:

First, create a file inside the project's root called .env.local

Then put the following env variables inside .env.local

```bash
TWITCH_CLIENT_ID # Your twitch client ID
TWITCH_ACCESS_TOKEN # Your twitch access token
```

For more information: https://api-docs.igdb.com/#about

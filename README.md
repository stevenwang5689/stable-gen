# [StableGEN](#StableGEN)

A React website that calls [StableConfigs](https://github.com/BensonKHuang/StableConfigs) library to visualize Stable Configurations of Monomers.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `serve -s build`

Deploys the application on your machine, looking at the appropriate `build` folder.<br />

### FAQ 

#### 1. How do I add more examples?
To add more examples, simply prepare new input.txt and constraints.txt files, copying them over into the `public/example_inputs` directory.
Afterwards, look at `src/components/computeComponents/input.js` and follow the convention in the `renderExampleDropdown()` function.

#### 2. What is an easy way to deploy this app? 
Simply run `npm run build` to generate the `build` folder. 
Then run `serve -s build` to serve the application on port :5000 by default.

If the server is already running, then simply rebuilding the `build` folder will automatically update the website!

#### 3. How can I deploy?

**Shell Instructions:**
- Build react app: `npm run build`
- Serve Application: `serve -s build`

#### 4. How could I further automate the deployment?
Consider using supervisord, and adding the program at the bottom of a `supervisord.conf` file + reload:

    [program:stablegen]
    directory=/absolute/path/to/stable-gen
    command=/usr/local/bin/serve -s build
    autostart=true

# Citation

#### Authors
Benson Huang, Varun Prabhu, Hasan Saleemi, Anthony Vento, Steven Wang, Kyle Zhou

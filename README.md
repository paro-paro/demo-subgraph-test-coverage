### Set up:

```bash
yarn
yarn codegen
yarn test // working perfectly fine
yarn coverage // not working as expected
```

### Issue

```bash
Compiling...

💬 factory skipped!

Running in coverage report mode.

Generating coverage report 📝

Handlers for source 'Factory':
Handler 'handlePoolCreated' is not tested.
Handler 'handlePoolAdded' is tested.
Test coverage: 50.0% (1/2 handlers).

Handlers for source 'StakePool':
Handler 'handleStaked' is not tested.
Test coverage: 0.0% (0/1 handlers).

Global test coverage: 33.3% (1/3 handlers).
```

- The coverage report wont mark the `handlePoolCreated` handler as tested even though is being tested and exported from within the `factory.test.ts` file.

- In the related issue, I mention inconsistent behavior. This is because for some (weird) reason, in this reproduction I am getting the opposite coverage report that I am getting in another subgraph (exact same use case and same test file), where the `handlePoolCreated` is marked as tested and `handlePoolAdded` is not. My first impresion was that maybe the issue was related with mocking contract calls (but here is working fine) so no idea what's the underlying problem. 

- There is also another branch `two-test-files` where the `factory.test.ts` is splitted into two files `add.test.ts` and `create.test.ts` and coverage report wont work either.

### Note

I am using docker since I am on a macbook pro M2 and failed tests wont throw (as already reported in [here](https://github.com/LimeChain/matchstick/releases)) when using the local os-m1 binary.

 

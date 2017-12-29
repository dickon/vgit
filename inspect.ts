import { AsyncTest, Expect, Test, TestCase, TestFixture } from "alsatian";
import { Repository } from "nodegit";

@TestFixture("whatever you'd like to call the fixture")
export class SetOfTests {
    

    // pass arguments into your test functions to keep your test code from being repetative
    @TestCase(2, 2, 4)
    @TestCase(2, 3, 5)
    @TestCase(3, 3, 6)
    @AsyncTest("addition tests")
    public async addTest(firstNumber: number, secondNumber: number, expectedSum: number) {
        let repo = await Repository.open("../alsatian");
        let commit = await repo.getBranchCommit("master");
        let message = commit.message();
        console.log("message "+message);
        Expect(firstNumber + secondNumber).toBe(expectedSum);
    }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var alsatian_1 = require("alsatian");
var SetOfTests = /** @class */ (function () {
    function SetOfTests() {
    }
    // pass arguments into your test functions to keep your test code from being repetative
    SetOfTests.prototype.addTest = function (firstNumber, secondNumber, expectedSum) {
        alsatian_1.Expect(firstNumber + secondNumber).toBe(expectedSum);
    };
    __decorate([
        alsatian_1.TestCase(2, 2, 4),
        alsatian_1.TestCase(2, 3, 5),
        alsatian_1.TestCase(3, 3, 6),
        alsatian_1.Test("addition tests")
    ], SetOfTests.prototype, "addTest");
    SetOfTests = __decorate([
        alsatian_1.TestFixture("whatever you'd like to call the fixture")
    ], SetOfTests);
    return SetOfTests;
}());
exports.SetOfTests = SetOfTests;

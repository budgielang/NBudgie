"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const parser_1 = require("../../lib/parser");
describe("Parser", () => {
    describe("parseLine", () => {
        it("renders with a single command that matches", () => __awaiter(this, void 0, void 0, function* () {
            // Arrange
            const result = {};
            const command = {
                render: sinon_1.stub().returns(result),
            };
            const matchersList = {
                matchers: [{
                        expression: /.*/,
                        parseArgs: sinon_1.stub(),
                    }],
            };
            const commandNames = ["valid"];
            const commandsAndMatchersFactory = {
                getCommand: sinon_1.stub().returns(Promise.resolve(command)),
                getMatchersList: sinon_1.stub().returns(Promise.resolve(matchersList)),
            };
            const parser = new parser_1.Parser({ commandNames, commandsAndMatchersFactory });
            // Act
            const parsed = yield parser.parseLine("");
            // Assert
            chai_1.expect(parsed).to.be.equal(result);
        }));
        it("renders with a matching command between non-matching commands", () => __awaiter(this, void 0, void 0, function* () {
            // Arrange
            const result = {};
            const invalidCommand = {
                render: sinon_1.stub(),
            };
            const validCommand = {
                render: sinon_1.stub().returns(result),
            };
            const invalidMatchersList = {
                matchers: [{
                        expression: /$a/,
                        parseArgs: sinon_1.stub(),
                    }],
            };
            const validMatchersList = {
                matchers: [{
                        expression: /.*/,
                        parseArgs: sinon_1.stub(),
                    }],
            };
            const commandNames = ["first", "valid", "third"];
            const commandsAndMatchersFactory = {
                getCommand: sinon_1.stub()
                    .withArgs("first").returns(Promise.resolve(invalidCommand))
                    .withArgs("third").returns(Promise.resolve(invalidCommand))
                    .withArgs("valid").returns(Promise.resolve(validCommand)),
                getMatchersList: sinon_1.stub()
                    .withArgs("first").returns(Promise.resolve(invalidMatchersList))
                    .withArgs("third").returns(Promise.resolve(invalidMatchersList))
                    .withArgs("valid").returns(Promise.resolve(validMatchersList)),
            };
            const parser = new parser_1.Parser({ commandNames, commandsAndMatchersFactory });
            // Act
            const parsed = yield parser.parseLine("");
            // Assert
            chai_1.expect(parsed).to.be.equal(result);
        }));
        it("returns undefined if no commands match", () => __awaiter(this, void 0, void 0, function* () {
            // Arrange
            const invalidCommand = {
                render: sinon_1.stub(),
            };
            const invalidMatchersList = {
                matchers: [{
                        expression: /$a/,
                        parseArgs: sinon_1.stub(),
                    }],
            };
            const commandNames = ["invalid"];
            const commandsAndMatchersFactory = {
                getCommand: sinon_1.stub()
                    .withArgs("invalid").returns(Promise.resolve(invalidCommand)),
                getMatchersList: sinon_1.stub()
                    .withArgs("invalid").returns(Promise.resolve(invalidMatchersList)),
            };
            const parser = new parser_1.Parser({ commandNames, commandsAndMatchersFactory });
            // Act
            const parsed = yield parser.parseLine("");
            // Assert
            chai_1.expect(parsed).to.be.equal(undefined);
        }));
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUMsQ0FBQzthQUN6RSxDQUFDO1lBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsRUFBRSxZQUFZLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO1lBRXhFLE1BQU07WUFDTixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUMsU0FBUztZQUNULGFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvcGFyc2VyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgfSBmcm9tIFwiY2hhaVwiO1xyXG5pbXBvcnQgeyBzdHViIH0gZnJvbSBcInNpbm9uXCI7XHJcblxyXG5pbXBvcnQgeyBDbGFzc0luc3RhbmNlRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9saWIvZmFjdG9yaWVzL2NsYXNzSW5zdGFuY2VGYWN0b3J5XCI7XHJcbmltcG9ydCB7IENvbW1hbmRzQW5kTWF0Y2hlcnNGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL2xpYi9mYWN0b3JpZXMvY29tbWFuZHNBbmRNYXRjaGVyc0ZhY3RvcnlcIjtcclxuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSBcIi4uLy4uL2xpYi9wYXJzZXJcIjtcclxuXHJcbmRlc2NyaWJlKFwiUGFyc2VyXCIsICgpID0+IHtcclxuICAgIGRlc2NyaWJlKFwicGFyc2VMaW5lXCIsICgpID0+IHtcclxuICAgICAgICBpdChcInJlbmRlcnMgd2l0aCBhIHNpbmdsZSBjb21tYW5kIHRoYXQgbWF0Y2hlc1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEFycmFuZ2VcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXI6IHN0dWIoKS5yZXR1cm5zKHJlc3VsdCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXJzTGlzdCA9IHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXJzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IC8uKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VBcmdzOiBzdHViKCksXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgY29tbWFuZE5hbWVzID0gW1widmFsaWRcIl07XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRzQW5kTWF0Y2hlcnNGYWN0b3J5ID0ge1xyXG4gICAgICAgICAgICAgICAgZ2V0Q29tbWFuZDogc3R1YigpLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKGNvbW1hbmQpKSxcclxuICAgICAgICAgICAgICAgIGdldE1hdGNoZXJzTGlzdDogc3R1YigpLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKG1hdGNoZXJzTGlzdCkpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHsgY29tbWFuZE5hbWVzLCBjb21tYW5kc0FuZE1hdGNoZXJzRmFjdG9yeSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFjdFxyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBhd2FpdCBwYXJzZXIucGFyc2VMaW5lKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgICAgIGV4cGVjdChwYXJzZWQpLnRvLmJlLmVxdWFsKHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KFwicmVuZGVycyB3aXRoIGEgbWF0Y2hpbmcgY29tbWFuZCBiZXR3ZWVuIG5vbi1tYXRjaGluZyBjb21tYW5kc1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEFycmFuZ2VcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGludmFsaWRDb21tYW5kID0ge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyOiBzdHViKCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkQ29tbWFuZCA9IHtcclxuICAgICAgICAgICAgICAgIHJlbmRlcjogc3R1YigpLnJldHVybnMocmVzdWx0KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgaW52YWxpZE1hdGNoZXJzTGlzdCA9IHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXJzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IC8kYS8sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VBcmdzOiBzdHViKCksXHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgdmFsaWRNYXRjaGVyc0xpc3QgPSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVyczogW3tcclxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiAvLiovLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlQXJnczogc3R1YigpLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmROYW1lcyA9IFtcImZpcnN0XCIsIFwidmFsaWRcIiwgXCJ0aGlyZFwiXTtcclxuICAgICAgICAgICAgY29uc3QgY29tbWFuZHNBbmRNYXRjaGVyc0ZhY3RvcnkgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXRDb21tYW5kOiBzdHViKClcclxuICAgICAgICAgICAgICAgICAgICAud2l0aEFyZ3MoXCJmaXJzdFwiKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShpbnZhbGlkQ29tbWFuZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLndpdGhBcmdzKFwidGhpcmRcIikucmV0dXJucyhQcm9taXNlLnJlc29sdmUoaW52YWxpZENvbW1hbmQpKVxyXG4gICAgICAgICAgICAgICAgICAgIC53aXRoQXJncyhcInZhbGlkXCIpLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKHZhbGlkQ29tbWFuZCkpLFxyXG4gICAgICAgICAgICAgICAgZ2V0TWF0Y2hlcnNMaXN0OiBzdHViKClcclxuICAgICAgICAgICAgICAgICAgICAud2l0aEFyZ3MoXCJmaXJzdFwiKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShpbnZhbGlkTWF0Y2hlcnNMaXN0KSlcclxuICAgICAgICAgICAgICAgICAgICAud2l0aEFyZ3MoXCJ0aGlyZFwiKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShpbnZhbGlkTWF0Y2hlcnNMaXN0KSlcclxuICAgICAgICAgICAgICAgICAgICAud2l0aEFyZ3MoXCJ2YWxpZFwiKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZSh2YWxpZE1hdGNoZXJzTGlzdCkpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHsgY29tbWFuZE5hbWVzLCBjb21tYW5kc0FuZE1hdGNoZXJzRmFjdG9yeSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFjdFxyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBhd2FpdCBwYXJzZXIucGFyc2VMaW5lKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgICAgIGV4cGVjdChwYXJzZWQpLnRvLmJlLmVxdWFsKHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KFwicmV0dXJucyB1bmRlZmluZWQgaWYgbm8gY29tbWFuZHMgbWF0Y2hcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBBcnJhbmdlXHJcbiAgICAgICAgICAgIGNvbnN0IGludmFsaWRDb21tYW5kID0ge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyOiBzdHViKCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGludmFsaWRNYXRjaGVyc0xpc3QgPSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVyczogW3tcclxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiAvJGEvLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlQXJnczogc3R1YigpLFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmROYW1lcyA9IFtcImludmFsaWRcIl07XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRzQW5kTWF0Y2hlcnNGYWN0b3J5ID0ge1xyXG4gICAgICAgICAgICAgICAgZ2V0Q29tbWFuZDogc3R1YigpXHJcbiAgICAgICAgICAgICAgICAgICAgLndpdGhBcmdzKFwiaW52YWxpZFwiKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShpbnZhbGlkQ29tbWFuZCkpLFxyXG4gICAgICAgICAgICAgICAgZ2V0TWF0Y2hlcnNMaXN0OiBzdHViKClcclxuICAgICAgICAgICAgICAgICAgICAud2l0aEFyZ3MoXCJpbnZhbGlkXCIpLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKGludmFsaWRNYXRjaGVyc0xpc3QpKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih7IGNvbW1hbmROYW1lcywgY29tbWFuZHNBbmRNYXRjaGVyc0ZhY3RvcnkgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBY3RcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gYXdhaXQgcGFyc2VyLnBhcnNlTGluZShcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFzc2VydFxyXG4gICAgICAgICAgICBleHBlY3QocGFyc2VkKS50by5iZS5lcXVhbCh1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXX0=

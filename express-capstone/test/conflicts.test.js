process.env.NODE_ENV = 'test';
var express = require("express")
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
let app = express;
var sinon = require("sinon");

let fakeConflict = {
    "conflict_id": -1,
    "conflict_type_id": 2,
    "start_time": 1300,
    "stop_time": 0300,
    "comment": "this is the way",
    "schedule_id": 3
}

let fakeConflict2 = {
    "conflict_id": -2,
    "conflict_type_id": 3,
    "start_time": 1400,
    "stop_time": 0400,
    "comment": "resol'nare",
    "schedule_id": 4 
}

let fakeConflicts = [fakeConflict, fakeConflict2];
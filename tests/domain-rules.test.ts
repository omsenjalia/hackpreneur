import test from "node:test";
import assert from "node:assert/strict";
import { getReadinessLevel, readinessQuestions } from "../src/readiness/rules";
import { scoreMatches, type MatchMentor, type MatchProject } from "../src/matching/score";

const project: MatchProject = { id:"p1", domain:"healthcare", stage:"prototype", needs:["Firebase","UI feedback"] };
const mentor = (changes: Partial<MatchMentor> = {}): MatchMentor => ({ id:"m1", name:"QA Mentor", org:"Example Organization", type:"mentor", expertiseTags:["firebase"], domains:["healthcare"], availableForMatching:true, ...changes });

test("matching requires explicit profile-sharing consent", () => {
  assert.deepEqual(scoreMatches(project,[mentor()],false),[]);
});

test("matching excludes unavailable mentors and mentors without need/domain overlap", () => {
  assert.deepEqual(scoreMatches(project,[mentor({availableForMatching:false}),mentor({id:"m2",expertiseTags:["legal"],domains:["education"]})],true),[]);
});

test("matching score explains exact need, domain, and availability points", () => {
  const [match]=scoreMatches(project,[mentor()],true);
  assert.equal(match.score,5);
  assert.deepEqual(match.breakdown,{needOverlap:3,domainOverlap:1,availability:1});
  assert.ok(match.reasons.some(reason=>reason.includes("Your need: Firebase")));
  assert.ok(match.reasons.includes("Domain overlap: healthcare"));
});

test("readiness tiers use the stated thresholds", () => {
  assert.equal(readinessQuestions.length,8);
  assert.equal(getReadinessLevel(Array(8).fill(false)),"Idea");
  assert.equal(getReadinessLevel([true,true,true,false,false,false,false,false]),"Prototype");
  assert.equal(getReadinessLevel([true,true,true,true,true,true,false,false]),"Pilot-ready");
});

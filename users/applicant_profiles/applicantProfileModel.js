const db = require('../../knex/knex.js');

//returns all applicant user type profiles
function findApplicantProfiles() {
  return db('applicant_profiles');
}

//returns specific applicant profile
function findApplicantProfileById(id) {
  return db('applicant_profiles')
    .where({ id })
    .first();
}

//returns applicant profile by dynamic filter
function findApplicantProfileBy(filter) {
  return db('applicant_profiles')
    .where(filter)
    .first();
}

//adds new applicant profile. This is only to be used during the onboarding process, function is inserted into add function in bothUserTypeModel file.
async function addApplicantProfile(id) {

  const defaultData = {
    applicant_id: id,
    city: "",
    state: "",
    country: "",
    zip: "",
    bio: "",
    org_name: "",
    sector: "",
    website_url: ""
  }

  const [profileId] = await db('applicant_profiles').insert(defaultData, "id");
  console.log(`base user profile created for user ID: ${defaultData.applicant_id}`);
  return findApplicantProfileById(profileId);
}

//updates data on applicant user profile
function updateApplicantProfile(changes, id) {
  return db('applicant_profiles')
    .where({ id })
    .first()
    .update(changes);
}

module.exports = {
  findApplicantProfiles,
  findApplicantProfileById,
  findApplicantProfileBy,
  addApplicantProfile,
  updateApplicantProfile
}
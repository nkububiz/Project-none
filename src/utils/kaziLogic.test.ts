import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidMpesaCode,
  isDuplicatePaymentCode,
  isValidKenyanPhone,
  formatInitials,
  formatSalary,
  formatRelativeTime,
  filterJob,
  convertSalaryAmount,
  getApplicationPipelineProgress,
  getPaymentMethodByCountry,
  calculateAtsMatchScore,
} from './kaziLogic.ts';

test('M-Pesa transaction code validation', () => {
  assert.equal(isValidMpesaCode('SJK4H7QX2P'), true);
  assert.equal(isValidMpesaCode('sjk4h7qx2p'), true);
  assert.equal(isValidMpesaCode('SJK4H7QX2'), false); // 9 chars
  assert.equal(isValidMpesaCode('SJK4H7QX2P1'), false); // 11 chars
  assert.equal(isValidMpesaCode('SJK4H7QX2!'), false); // invalid char
  assert.equal(isValidMpesaCode(''), false);
});

test('Duplicate payment code detection', () => {
  const codes = ['SJK4H7QX2P', 'SJK3D1MZ8T', 'SJJ9P0LW4R'];
  assert.equal(isDuplicatePaymentCode('SJK4H7QX2P', codes), true);
  assert.equal(isDuplicatePaymentCode('sjk4h7qx2p', codes), true);
  assert.equal(isDuplicatePaymentCode('NEWCODE123', codes), false);
});

test('Kenyan Safaricom phone number validation', () => {
  assert.equal(isValidKenyanPhone('0712345678'), true);
  assert.equal(isValidKenyanPhone('0722 908 112'), true);
  assert.equal(isValidKenyanPhone('+254712345678'), true);
  assert.equal(isValidKenyanPhone('0110123456'), true); // Safaricom 011 prefix
  assert.equal(isValidKenyanPhone('0812345678'), false); // invalid prefix
  assert.equal(isValidKenyanPhone('12345'), false);
  assert.equal(isValidKenyanPhone(''), false);
});

test('Location-based payment methods', () => {
  const ke = getPaymentMethodByCountry('KE');
  assert.equal(ke.currency, 'KES');
  assert.equal(ke.amount, 500);
  assert.equal(ke.stkPushSupported, true);

  const ng = getPaymentMethodByCountry('NG');
  assert.equal(ng.currency, 'NGN');
  assert.equal(ng.amount, 4500);

  const gh = getPaymentMethodByCountry('GH');
  assert.equal(gh.currency, 'GHS');
  assert.equal(gh.amount, 45);

  const other = getPaymentMethodByCountry('US');
  assert.equal(other.currency, 'USD');
  assert.equal(other.amount, 4);
});

test('ATS remote-readiness match score calculation', () => {
  const jobTags = ['React', 'JavaScript', 'TypeScript'];
  const candidateSkills = ['React', 'TypeScript', 'Node.js'];
  const score = calculateAtsMatchScore(jobTags, candidateSkills, true);
  assert.ok(score >= 80 && score <= 99);

  const lowMatchScore = calculateAtsMatchScore(jobTags, ['Python', 'Django'], false);
  assert.ok(lowMatchScore <= 70);
});

test('Initials extraction', () => {
  assert.equal(formatInitials('Sendwave Labs'), 'SL');
  assert.equal(formatInitials('Amani Wekesa'), 'AW');
  assert.equal(formatInitials('Twiga'), 'T');
  assert.equal(formatInitials(''), '??');
});

test('Salary formatting', () => {
  assert.equal(
    formatSalary({ currency: 'USD', min: 3500, max: 5000, unit: 'MONTH' }),
    '$3,500 – $5,000 / mo'
  );
  assert.equal(
    formatSalary({ currency: 'KES', min: 90000, max: 120000, unit: 'MONTH' }),
    'KES 90,000 – 120,000 / mo'
  );
});

test('Relative time formatting', () => {
  assert.equal(formatRelativeTime(0), 'Today');
  assert.equal(formatRelativeTime(1), '1 day ago');
  assert.equal(formatRelativeTime(5), '5 days ago');
  assert.equal(formatRelativeTime(45), '30+ days ago');
});

test('Job filtering query and categories', () => {
  const job = {
    title: 'Senior Frontend Engineer',
    company: 'Sendwave Labs',
    location: 'Remote · Africa timezones',
    category: 'engineering',
    type: 'Full-time',
    tags: ['JavaScript', 'React'],
  };

  assert.equal(filterJob(job, 'Frontend', 'all', 'all'), true);
  assert.equal(filterJob(job, 'React', 'engineering', 'Full-time'), true);
  assert.equal(filterJob(job, 'Design', 'all', 'all'), false);
});

test('Currency conversion with exchange rate', () => {
  assert.equal(convertSalaryAmount(1000, 'USD', 'KES', 129), 129000);
  assert.equal(convertSalaryAmount(129000, 'KES', 'USD', 129), 1000);
});

test('Application pipeline progress percentages', () => {
  assert.equal(getApplicationPipelineProgress('submitted'), 25);
  assert.equal(getApplicationPipelineProgress('forwarded'), 50);
  assert.equal(getApplicationPipelineProgress('under_review'), 75);
  assert.equal(getApplicationPipelineProgress('shortlisted'), 100);
});

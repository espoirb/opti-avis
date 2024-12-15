import { checkDatabaseTables } from '../src/lib/check-tables';

console.log('Starting database verification...\n');

checkDatabaseTables()
  .then(() => {
    console.log('\nDatabase verification complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nDatabase verification failed:', error);
    process.exit(1);
  }); 
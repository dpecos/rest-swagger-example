import StocksMemoryDAO from './stocks-memory-dao.js';

let memoryDAO = null;

export function getInstance(type) {
  if (type === 'memory') {
    if (memoryDAO === null) {
      memoryDAO = new StocksMemoryDAO();
    }
    return memoryDAO;
  }
  throw new Error('Unknown DAO type ' + type);
}

const axios = require('axios');
const SlidingWindow = require('../window/sliding.js');
const numberUtils = require('../utils/numbers.js');

const windowSize = 10;
const slidingWindow = new SlidingWindow(windowSize);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODc1OTk3LCJpYXQiOjE3MjM4NzU2OTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBkMzc1ZjE0LTJkZWQtNDc4Ni1iNGI4LTQ5NDA5NTBiNjk5ZSIsInN1YiI6ImdhbnRhbGFhdmluYXNoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6Ik1hbGxhIFJlZGR5IEVuZ2lubmVyaW5nIENvbGxlZ2UiLCJjbGllbnRJRCI6IjBkMzc1ZjE0LTJkZWQtNDc4Ni1iNGI4LTQ5NDA5NTBiNjk5ZSIsImNsaWVudFNlY3JldCI6IlZVRVlnTnZqeW95cWdIZ1AiLCJvd25lck5hbWUiOiJHYW50YWxhIEF2aW5hc2giLCJvd25lckVtYWlsIjoiZ2FudGFsYWF2aW5hc2hAZ21haWwuY29tIiwicm9sbE5vIjoiMjFKNDFBNjJGMSJ9.j171MxvIA0OHN5KkAAoICUDhWWid38SEURdG-ZQlRYk';

const getNumbers = async (numberid) => {
    const numbers = await fetchNumbers(numberid);
    const previousNumbers = slidingWindow.getCurrentState();

    numbers.forEach((num) => {
        slidingWindow.addNumber(num);
    });

    const average = numberUtils.calculateAverage(slidingWindow.getNumbers());
    const currentState = slidingWindow.getCurrentState();

    return {
        numbers,
        windowPrevState: previousNumbers,
        windowCurrState: currentState,
        avg: average
    };
};

const fetchNumbers = async (numberid) => {
    const urlMapping = {
        'prime': 'http://20.244.56.144/test/primes',
        'fibo': 'http://20.244.56.144/test/fibo',
        'even': 'http://20.244.56.144/test/even',
        'rand': 'http://20.244.56.144/test/rand'
    };

    // Map abbreviations to full names
    const idMapping = {
        'e': 'even',
        'p': 'prime',
        'f': 'fibo',
        'r': 'rand'
    };

    const resolvedId = idMapping[numberid] || numberid;
    const url = urlMapping[resolvedId];
    
    if (!url) {
        throw new Error(`Invalid numberid: ${numberid}`);
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.numbers;
    } catch (error) {
        throw new Error(`Failed to fetch numbers: ${error.message}`);
    }
};

module.exports = {
    getNumbers
};

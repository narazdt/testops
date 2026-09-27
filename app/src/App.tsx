import React, { useState } from 'react';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState<boolean>(false);

  const handleDigit = (digit: string) => {
    if (waitingForNext) {
      setDisplay(digit);
      setWaitingForNext(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const currentValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(currentValue);
    } else if (operator) {
      const result = calculate(prevValue, currentValue, operator);
      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForNext(true);
    setOperator(nextOperator);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (operator === null || prevValue === null) return;
    const currentValue = parseFloat(display);
    const result = calculate(prevValue, currentValue, operator);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNext(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-xs rounded-2xl bg-slate-800 p-6 shadow-2xl border border-slate-700">
        <h1 className="mb-4 text-center text-xl font-bold text-slate-200">Calculadora</h1>
        
        {/* Display da Calculadora com data-testid */}
        <div className="mb-4 rounded-xl bg-slate-950 p-4 text-right">
          <div className="h-6 text-xs text-slate-400">
            {prevValue !== null && operator ? `${prevValue} ${operator}` : ''}
          </div>
          <div 
            data-testid="display" 
            className="text-3xl font-semibold tracking-tight text-white overflow-x-auto"
          >
            {display}
          </div>
        </div>

        {/* Teclado */}
        <div className="grid grid-cols-4 gap-2">
          <button 
            onClick={handleClear} 
            className="col-span-3 rounded-lg bg-red-500/20 p-3 text-red-400 font-semibold hover:bg-red-500/30 transition"
          >
            C
          </button>
          <button 
            onClick={() => handleOperator('/')} 
            className="rounded-lg bg-indigo-600/30 p-3 text-indigo-300 font-semibold hover:bg-indigo-600/40 transition"
          >
            /
          </button>

          {['7', '8', '9'].map((digit) => (
            <button 
              key={digit} 
              onClick={() => handleDigit(digit)} 
              className="rounded-lg bg-slate-700 p-3 text-white font-medium hover:bg-slate-600 transition"
            >
              {digit}
            </button>
          ))}
          <button 
            onClick={() => handleOperator('*')} 
            className="rounded-lg bg-indigo-600/30 p-3 text-indigo-300 font-semibold hover:bg-indigo-600/40 transition"
          >
            *
          </button>

          {['4', '5', '6'].map((digit) => (
            <button 
              key={digit} 
              onClick={() => handleDigit(digit)} 
              className="rounded-lg bg-slate-700 p-3 text-white font-medium hover:bg-slate-600 transition"
            >
              {digit}
            </button>
          ))}
          <button 
            onClick={() => handleOperator('-')} 
            className="rounded-lg bg-indigo-600/30 p-3 text-indigo-300 font-semibold hover:bg-indigo-600/40 transition"
          >
            -
          </button>

          {['1', '2', '3'].map((digit) => (
            <button 
              key={digit} 
              onClick={() => handleDigit(digit)} 
              className="rounded-lg bg-slate-700 p-3 text-white font-medium hover:bg-slate-600 transition"
            >
              {digit}
            </button>
          ))}
          <button 
            onClick={() => handleOperator('+')} 
            className="rounded-lg bg-indigo-600/30 p-3 text-indigo-300 font-semibold hover:bg-indigo-600/40 transition"
          >
            +
          </button>

          <button 
            onClick={() => handleDigit('0')} 
            className="col-span-2 rounded-lg bg-slate-700 p-3 text-white font-medium hover:bg-slate-600 transition"
          >
            0
          </button>
          <button 
            onClick={handleEqual} 
            className="col-span-2 rounded-lg bg-indigo-600 p-3 text-white font-semibold hover:bg-indigo-500 transition"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
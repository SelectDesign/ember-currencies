import { assert } from '@ember/debug';
import { isBlank } from '@ember/utils';

import { currenciesObject } from './currencies';

export function formatMoneyAmount(amount, digitSeparator, decimalSeparator, currencyPlacement, symbol, smallestUnitRatio, hideCents, currencyHidden){
  let amountFinal = amount / smallestUnitRatio;
  let powerOfTen = Math.log(smallestUnitRatio) * Math.LOG10E;

  amountFinal = amountFinal.toLocaleString("en-US", {minimumFractionDigits: powerOfTen});
  amountFinal = amountFinal.replace(/\./g, "_");
  amountFinal = amountFinal.replace(/,/g, digitSeparator);
  amountFinal = amountFinal.replace(/_/g, decimalSeparator);
  let result = "";

  if(currencyHidden){
    result = amountFinal;
  }
  else if(currencyPlacement === 's'){
    result = amountFinal + symbol;
  }
  else{
    result = symbol + amountFinal;
  }

  if (hideCents) {
    return result.split('.')[0];
  } else {
    return result;
  }
}

export function formatMoneyAmountByCurrency(amount, currencyValue, hideCents, currencyHidden){

  let currency = currenciesObject[currencyValue];

  if(isBlank(currency)){
      assert("undefined currency : " + currencyValue);
  }

  let currencyPlacement = currency.currencyPlacement;
  let digitSeparator = currency.digitSeparator;
  let decimalSeparator = currency.decimalSeparator;
  let symbol = currency.symbol;
  let smallestUnitRatio = currency.smallestUnitRatio;

  return formatMoneyAmount(amount, digitSeparator, decimalSeparator, currencyPlacement, symbol, smallestUnitRatio, hideCents, currencyHidden);
}

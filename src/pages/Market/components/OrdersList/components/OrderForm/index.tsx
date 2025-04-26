import Styles from './styles.module.css';
import { TextInput } from '../../../../../../components';
import { getMessage } from '../../../../../../utils/translate';
import { renderNumber } from '../../../../../../utils/render';
import { type ChangeEventHandler, useState } from 'react';

const MAX_DECIMALS = 4;

interface Props {
  totalRemain?: number;
  totalValue?: number;
  averagePrice?: number;
}

export const OrderForm = ({ totalRemain = 0, totalValue = 0, averagePrice = 0 }: Props) => {
  const [percent, setPercent] = useState<number>();

  const remainByPercent = percent ? (totalRemain * percent) / 100 : 0;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (!value) {
      setPercent(undefined);
      return;
    }

    if (value.includes('.')) {
      const decimals = value.split('.')[1];

      if (MAX_DECIMALS < decimals.length) {
        return;
      }
    }

    const percentValue = Number(value);

    if (isNaN(percentValue) || percentValue < 0 || 100 < percentValue) {
      return;
    }

    setPercent(percentValue);
  };

  return (
    <form className={Styles.form} onSubmit={(event) => event.preventDefault()}>
      <h4>{getMessage('submit_order_form')}</h4>

      <div className={Styles.gridContainer}>
        <span>{getMessage('amount_sum')}</span>

        <span>{renderNumber(totalRemain)}</span>
      </div>

      <div className={Styles.gridContainer}>
        <span>{getMessage('total_price_sum')}</span>

        <span>{renderNumber(totalValue)}</span>
      </div>

      <div className={Styles.gridContainer}>
        <span>{getMessage('price_mean')}</span>

        <span>{renderNumber(averagePrice)}</span>
      </div>

      <div className={Styles.gridContainer}>
        <span>{getMessage('percent')}</span>

        <TextInput
          type="number"
          value={percent?.toString() ?? ''}
          onChange={handleInputChange}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className={Styles.gridContainer}>
        <span>{getMessage('order_amount')}</span>

        <span>{renderNumber(remainByPercent)}</span>
      </div>

      <div className={Styles.gridContainer}>
        <span>{getMessage('order_price')}</span>

        <span>{renderNumber(remainByPercent * averagePrice)}</span>
      </div>
    </form>
  );
};

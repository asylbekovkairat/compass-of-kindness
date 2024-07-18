import { Button, Card } from 'antd';

import { HandsIcon } from '~shared/ui';

export const CharityCardView = () => {
  return (
    <Card
      className="w-[300px]"
      cover={
        <img
          className="cursor-pointer"
          alt="example"
          src="https://pmedia.launchgood.com/166012/sponsor_quran_for_6_in_southern_africa_DHADS%202024%20-%202024-07-17T031829.094-493x370.png"
        />
      }
      actions={[
        <Button
          className="flex items-center justify-center mx-auto border-none text-lg"
          icon={<HandsIcon />}
          key="hands"
        >
          Помочь
        </Button>,
      ]}
    >
      <div>
        <p>Sponsor Quran for $6 in Southern Africa</p>
      </div>
    </Card>
  );
};

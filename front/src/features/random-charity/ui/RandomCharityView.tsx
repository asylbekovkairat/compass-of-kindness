import { Button } from 'antd';

export const RandomCharityView = () => {
  return (
    <>
      <section className="flex justify-center-center flex-col-reverse mt-7">
        <div className="flex flex-col gap-4 text-center items-center w-full">
          <h1 className="text-3xl">
            Добро не имеет границ! Сделай доброе дело, не выходя из дома.
          </h1>
          <p className="font-light text-[#1d1f24] text-lg">
            Нажмите на кнопку и система сама подберет вам нужного человека
          </p>
          <Button className="mt-6" type="primary">
            Совершить добро
          </Button>
        </div>
        <img
          className="w-full mb-4"
          src="/assets/charity-illustration.png"
          alt="charity illustration"
        />
      </section>
    </>
  );
};

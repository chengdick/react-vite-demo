import StyleSetterV2 from "@/components/style-setter";

const StyleSetter = () => {
  return (
    <div style={{ width: 400 }}>
      <StyleSetterV2
        onChange={(res) => {
          console.log(res);
        }}
      />
    </div>
  );
};

export default StyleSetter;

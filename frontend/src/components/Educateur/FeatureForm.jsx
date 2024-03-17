import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const FeatureForm = () => {
  const [features, setFeatures] = useState([{ name: "" }, { name: "" }]);

  const handleFeatureChange = (index, event) => {
    const newFeatures = [...features];
    newFeatures[index].name = event.target.value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, { name: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would make your API call to the server, sending `features`
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      spacing={4}>
      {features.map((feature, index) => (
        <FormControl key={index}>
          <FormLabel>Feature {index + 1}</FormLabel>
          <Input
            value={feature.name}
            onChange={(event) => handleFeatureChange(index, event)}
          />
        </FormControl>
      ))}
      <Button onClick={addFeature}>Add Feature</Button>
      <Button
        type="submit"
        colorScheme="blue">
        Submit
      </Button>
    </VStack>
  );
};

export default FeatureForm;

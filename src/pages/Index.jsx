import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading, Textarea, useToast } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

const Index = () => {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [n, setN] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const toast = useToast();

  const encrypt = (text, n) => {
    const shift = n % 26;
    return text
      .split("")
      .map((char) => {
        let code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          // Uppercase letters
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          // Lowercase letters
          return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char; // Non-alphabetic characters are unchanged
      })
      .join("");
  };

  const handleEncrypt = () => {
    if (!key || !text || !n) {
      toast({
        title: "Error",
        description: "All fields are required to perform encryption",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const result = encrypt(key, text, n);
    setEncryptedText(result);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading as="h1">n-Dimensional Lattice Cryptography</Heading>
        <FormControl id="key" isRequired>
          <FormLabel>Key</FormLabel>
          <Input placeholder="Enter your key" value={key} onChange={(e) => setKey(e.target.value)} />
        </FormControl>
        <FormControl id="text" isRequired>
          <FormLabel>Text</FormLabel>
          <Textarea placeholder="Enter your text" value={text} onChange={(e) => setText(e.target.value)} />
        </FormControl>
        <FormControl id="n" isRequired>
          <FormLabel>n (Dimension)</FormLabel>
          <Input placeholder="Enter n" value={n} onChange={(e) => setN(e.target.value)} type="number" />
        </FormControl>
        <Button leftIcon={<FaLock />} colorScheme="blue" onClick={handleEncrypt}>
          Encrypt
        </Button>
        {encryptedText && (
          <Box>
            <Heading as="h3" size="lg">
              Encrypted Text
            </Heading>
            <Textarea isReadOnly value={encryptedText} />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;

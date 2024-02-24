import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading, Textarea, useToast } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

const Index = () => {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [n, setN] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const toast = useToast();

  // これはダミーの暗号化関数です。実際の暗号化ロジックを実装する必要があります。
  const encrypt = (key, text, n) => {
    // 暗号化されたテキストを返します（ダミーの結果）
    return `encrypted(${text})`;
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

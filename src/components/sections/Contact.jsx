import React, { useRef, useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  z-index: 1;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  padding: 40px;
  background-color: rgba(17, 25, 40, 0.8);
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
`;

const Title = styled.h2`
  font-size: 52px;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary || "#bbb"};
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  margin-bottom: 12px;
  font-weight: 600;
`;

const ContactInput = styled.input`
  flex: 1;
  height: 45px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary || "#7e22ce"};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  height: 120px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  border-radius: 12px;
  padding: 12px 16px;
  resize: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary || "#7e22ce"};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 10px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);

    const formData = new FormData(form.current);
    formData.append("access_key", "a30b6f28-a651-4cd9-af16-fbbd9bc912f6"); // ✅ Your Web3Forms Key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Message Sent Successfully! 🚀");
        form.current.reset();
      } else {
        alert("Failed to send message. Check your access key and fields.");
        console.error("Web3Forms Error:", result);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Network Error:", error);
    }

    setIsSending(false);
  };

  return (
    <Container id="contact">
      <Title>Contact</Title>
      <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
      <Wrapper>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          {/* Hidden input for Web3Forms authentication */}
          <input type="hidden" name="access_key" value="a30b6f28-a651-4cd9-af16-fbbd9bc912f6" />

          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput type="email" placeholder="Your Email" name="email" required />
          <ContactInput type="text" placeholder="Your Name" name="name" required />
          <ContactInput type="text" placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" name="message" rows={4} required />

          <ContactButton type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send"}
          </ContactButton>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiEye, FiEyeOff, FiChevronRight, FiX } from "react-icons/fi";
import { GoCheckCircle } from "react-icons/go";

// === ANIMATIONS ===
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// const pulse = keyframes`
//   0% {
//     box-shadow: 0 0 0 0 rgba(42, 166, 160, 0.7);
//   }
//   70% {
//     box-shadow: 0 0 0 15px rgba(42, 166, 160, 0);
//   }
//   100% {
//     box-shadow: 0 0 0 0 rgba(42, 166, 160, 0);
//   }
// `;

// === STYLED COMPONENTS ===
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0b0b0b 0%, #161616 50%, #0b0b0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(211, 47, 47, 0.15) 0%,
      transparent 70%
    );
    top: -100px;
    right: -100px;
    border-radius: 50%;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(211, 47, 47, 0.1) 0%,
      transparent 70%
    );
    bottom: -50px;
    left: -50px;
    border-radius: 50%;
    pointer-events: none;
  }
`;

const AuthWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 40px;
  padding: 60px 50px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 0.6s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 40px 30px;
    border-radius: 32px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 28px;
  color: #333333;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(90deg);
    color: #000000;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 40px;
  animation: ${slideInRight} 0.7s ease-out;

  h1 {
    font-family: "BBH Bartle", serif;
    font-size: 32px;
    font-weight: 400;
    color: #d32f2f;
    letter-spacing: 2px;
    margin: 0;
    margin-bottom: 24px;
  }

  h2 {
    font-family: "Playfair Display", serif;
    font-size: 44px;
    font-weight: 700;
    color: #000000;
    letter-spacing: -0.5px;
    margin: 0;
    line-height: 1.2;
    margin-bottom: 18px;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #666666;
    margin: 0;
    line-height: 1.5;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 35px;
  position: relative;
  border-bottom: 2px solid #e0e0e0;
`;

const Tab = styled.button`
  flex: 1;
  padding: 14px 20px;
  border: none;
  background: transparent;
  color: ${(props) => (props.$active ? "#d32f2f" : "#999999")};
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  cursor: pointer;
  border-radius: 0;
  border-bottom: ${(props) => (props.$active ? "3px solid #d32f2f" : "none")};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  margin-bottom: -2px;

  &:hover {
    color: ${(props) => (props.$active ? "#d32f2f" : "#666666")};
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #333333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: #f5f5f5;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  color: #333333;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
  padding-right: ${(props) => (props.$hasIcon ? "45px" : "16px")};

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    background: #ffffff;
    border-color: #d32f2f;
    box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.1);
  }

  &:hover {
    border-color: #d0d0d0;
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #999999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: color 0.2s ease;

  &:hover {
    color: #d32f2f;
  }
`;

const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: #d32f2f;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  text-align: left;
  padding: 0;

  &:hover {
    color: #b71c1c;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;

  &:hover {
    background: linear-gradient(135deg, #b71c1c 0%, #8b0000 100%);
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(211, 47, 47, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(211, 47, 47, 0.08);
  border: 1px solid #d32f2f;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${fadeInUp} 0.4s ease-out;

  svg {
    color: #d32f2f;
    font-size: 20px;
    flex-shrink: 0;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 13px;
    color: #d32f2f;
    margin: 0;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(211, 47, 47, 0.08);
  border: 1px solid #d32f2f;
  border-radius: 12px;
  padding: 12px 16px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: #d32f2f;
  animation: ${fadeInUp} 0.3s ease-out;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }

  span {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    color: #999999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #f5f5f5;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  color: #333333;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
    border-color: #d32f2f;
    transform: translateY(-2px);
  }
`;

const TermsText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #666666;
  text-align: center;
  margin: 0;
  line-height: 1.5;

  a {
    color: #d32f2f;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #b71c1c;
      text-decoration: underline;
    }
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: #666666;
  cursor: pointer;
  user-select: none;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #d32f2f;
  }

  a {
    color: #d32f2f;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &:hover {
    color: #333333;
  }
`;

// === MAIN COMPONENT ===
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    rememberMe: false,
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage({ type: "error", text: "Email and password are required." });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return false;
    }

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        setMessage({ type: "error", text: "Full name is required." });
        return false;
      }
      if (formData.password.length < 6) {
        setMessage({
          type: "error",
          text: "Password must be at least 6 characters.",
        });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match." });
        return false;
      }
      if (!formData.agreeTerms) {
        setMessage({
          type: "error",
          text: "Please agree to the terms and conditions.",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isLogin) {
        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });
      } else {
        setMessage({
          type: "success",
          text: "Account created successfully! Redirecting...",
        });
      }

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Auth error:", error);
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <Container>
      <AuthWrapper>
        {/* Close Button */}
        <CloseButton onClick={handleClose}>
          <FiX />
        </CloseButton>

        {/* Logo */}
        <Logo>
          <h1>PresentBox</h1>
          <h2>Unlock the full experience</h2>
          <p>
            {isLogin
              ? "Access your personalized well-being journey."
              : "Creating an account is free and gives you full access to our library."}
          </p>
        </Logo>

        {/* Tabs */}
        <TabContainer>
          <Tab
            $active={isLogin}
            onClick={() => {
              setIsLogin(true);
              setMessage({ type: "", text: "" });
              setFormData((prev) => ({
                ...prev,
                fullName: "",
                confirmPassword: "",
              }));
            }}
          >
            Sign In
          </Tab>
          <Tab
            $active={!isLogin}
            onClick={() => {
              setIsLogin(false);
              setMessage({ type: "", text: "" });
            }}
          >
            Sign Up
          </Tab>
        </TabContainer>

        {/* Messages */}
        {message.text &&
          (message.type === "success" ? (
            <SuccessMessage>
              <GoCheckCircle />
              <p>{message.text}</p>
            </SuccessMessage>
          ) : (
            <ErrorMessage>{message.text}</ErrorMessage>
          ))}

        {/* Form */}
        <FormContainer onSubmit={handleSubmit}>
          {/* Full Name (Sign Up Only) */}
          {!isLogin && (
            <FormGroup>
              <Label htmlFor="fullName">Full Name</Label>
              <InputWrapper>
                <Input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </InputWrapper>
            </FormGroup>
          )}

          {/* Email */}
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </InputWrapper>
          </FormGroup>

          {/* Password */}
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                $hasIcon
              />
              <IconButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </IconButton>
            </InputWrapper>
          </FormGroup>

          {/* Confirm Password (Sign Up Only) */}
          {!isLogin && (
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputWrapper>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  $hasIcon
                />
                <IconButton
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </IconButton>
              </InputWrapper>
            </FormGroup>
          )}

          {/* Remember Me / Agree Terms */}
          {isLogin ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                Remember me
              </CheckboxLabel>
              <ForgotPassword type="button">Forgot Password?</ForgotPassword>
            </div>
          ) : (
            <CheckboxLabel>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              I agree to the{" "}
              <a onClick={() => alert("Terms & Conditions")}>
                Terms & Conditions
              </a>
            </CheckboxLabel>
          )}

          {/* Submit Button */}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            <FiChevronRight size={18} />
          </SubmitButton>
        </FormContainer>

        {/* Social Login */}
        <Divider>
          <span>Or Continue With</span>
        </Divider>

        <SocialButtons>
          <SocialButton type="button">Google</SocialButton>
          <SocialButton type="button">GitHub</SocialButton>
        </SocialButtons>

        {/* Toggle Auth Mode */}
        <TermsText style={{ marginTop: "28px" }}>
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <a
                onClick={() => {
                  setIsLogin(false);
                  setMessage({ type: "", text: "" });
                }}
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                onClick={() => {
                  setIsLogin(true);
                  setMessage({ type: "", text: "" });
                }}
              >
                Sign In
              </a>
            </>
          )}
        </TermsText>
      </AuthWrapper>
    </Container>
  );
}

export default Auth;

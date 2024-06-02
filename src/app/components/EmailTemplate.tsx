import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Follow link bellow to verify your account on tbc-shop</p>
    <a>{message}</a>
  </div>
);

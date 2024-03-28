import React, { type ReactNode } from "react";

// Defining prop types for the ShowComponentProps
interface ShowComponentProps {
  children: ReactNode;
}

// Defining prop types for the WhenProps
interface WhenProps {
  isTrue: boolean;
  children: ReactNode;
}

// Defining prop types for the ElseProps
interface ElseProps {
  children: ReactNode;
}

// Component for conditionally rendering based on `isTrue`
const When: React.FC<WhenProps> = ({ isTrue, children }) => {
  return isTrue ? children : null;
};

// Component for rendering an alternative if `When` is not rendered
const Else: React.FC<ElseProps> = ({ children }) => {
  return children;
};

// The main ShowComponent that decides which child to render
const ShowComponent: React.FC<ShowComponentProps> & {
  When: React.FC<WhenProps>;
  Else: React.FC<ElseProps>;
} = ({ children }: { children: ReactNode }) => {
  let when: ReactNode = null;
  let otherwise: ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (Object.prototype.hasOwnProperty.call(child.props, "isTrue")) {
        if (child.props.isTrue && !when) {
          when = child;
        }
      } else {
        otherwise = child;
      }
    }
  });

  return when ?? otherwise;
};

// Attaching When and Else as static properties to ShowComponent
ShowComponent.When = When;
ShowComponent.Else = Else;

export { ShowComponent };

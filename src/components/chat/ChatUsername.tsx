import React from "react";
import { connect } from "react-redux";

import { Field, FieldRenderProps, Form } from "react-final-form";
import { updateSession } from "../../store/system/actions";

type Props = FieldRenderProps<string, any>;

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <input type="text" {...input} {...rest} />
);

interface IProps {
  updateSession: typeof updateSession;
}

interface IUsername {
  username: string;
}

const ChatUsername = ({ updateSession }: IProps) => {
  const onSubmit = (values: IUsername) => {
    updateSession({
      username: values.username,
      loggedIn: true,
      session: "abcd"
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ username: "Guest" }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <Field<string>
            name="username"
            component={TextInput}
            placeholder="Username"
          />
          <button type="submit">Enter</button>
        </form>
      )}
    />
  );
};

export default connect(null, { updateSession })(ChatUsername);

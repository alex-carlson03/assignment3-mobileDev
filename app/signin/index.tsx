import { theme } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

type SigninForm = z.infer<typeof signinSchema>;

const index = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const watchedValues = watch();

  const isFormFilled = Object.values(watchedValues).every((v) => v.length > 0);

  const toSignup = () => {
    router.push("/signin/signup");
  };

  const onSubmit = (data: SigninForm) => {
    alert(
      `Email: ${data.email}\nPassword: ${data.password}\nNo actual signin logic yet, just form validation`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={theme.colors.muted}
                style={styles.inputText}
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.icon}
              >
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color={theme.colors.muted}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && (
          <Text style={styles.error}> {errors.password.message}</Text>
        )}
        <Pressable
          style={!isFormFilled ? styles.buttonDisabled : styles.button}
          disabled={!isFormFilled}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Login</Text>
        </Pressable>

        <Pressable onPress={toSignup} style={styles.navSignup}>
          <Text style={{ color: theme.colors.primary, marginTop: 10 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg,
  },
  content: {
    width: "80%",
    height: "50%",
    backgroundColor: theme.colors.card,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    color: theme.colors.text,
  },
  error: {
    color: theme.colors.error,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
    borderRadius: theme.radius.input,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  icon: {
    padding: 10,
  },
  inputText: {
    flex: 1,
    color: theme.colors.text,
    padding: 10,
  },
  navSignup: {
    alignItems: "center",
    color: theme.colors.primary,
  },
});

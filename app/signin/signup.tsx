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

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /[!@#$%^&*()?]/,
        "Password must contain at least one special character.",
      )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter."),
    confirmPass: z.string().trim().min(1, "Confirm Password"),
    phoneNum: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be 10 digits long"),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      phoneNum: "",
    },
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const watchedValues = watch();

  const isFormFilled = Object.values(watchedValues).every((v) => v.length > 0);

  const onSubmit = (data: SignupForm) => {
    alert(
      `Name: ${data.name}\n
        Email: ${data.email}\n
        Password: ${data.password}\n
        Confirm Password: ${data.confirmPass}\n
        Phone Number: ${data.phoneNum}\n
        Signup successful! RAHHHH`,
    );
  };

  const toIndex = () => {
    router.push("/signin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/*The Name input field */}
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        {/*The phone number input field */}
        <Controller
          control={control}
          name="phoneNum"
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.phoneNum && (
          <Text style={styles.error}>{errors.phoneNum.message}</Text>
        )}

        {/*The email input field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder="Enter your email"
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

        {/*The password input field */}
        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter your password"
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
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
          <Text style={styles.passwordCriteria}>
            Password must be at least 8 characters long, contain at least one
            special character, one uppercase letter, and one lowercase letter.
          </Text>
        </View>

        {/*The confirm password input field */}
        <Controller
          control={control}
          name="confirmPass"
          render={({ field: { value, onChange } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm your password"
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
        {errors.confirmPass && (
          <Text style={styles.error}>{errors.confirmPass.message}</Text>
        )}

        {/*The submit button */}
        <Pressable
          style={!isFormFilled ? styles.buttonDisabled : styles.button}
          disabled={!isFormFilled}
          onPress={handleSubmit(onSubmit)}
        >
          <Text> Sign Up </Text>
        </Pressable>

        <Pressable onPress={toIndex} style={styles.navSignup}>
          <Text style={{ color: theme.colors.primary, marginTop: 10 }}>
            {"Already have an account? Sign In"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg,
  },
  content: {
    width: "80%",
    height: "70%",
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    color: theme.colors.text,
  },
  passwordCriteria: {
    color: theme.colors.muted,
    fontSize: 8,
    marginTop: 4,
    marginHorizontal: 20,
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
    marginVertical: 5,
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

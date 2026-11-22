import { useForm } from "react-hook-form";  
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  let savedRegistration = null;

  try {
    savedRegistration = JSON.parse(
      localStorage.getItem("studentRegistration")
    );
  } catch {
    localStorage.removeItem("studentRegistration");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: savedRegistration || {
      studentName: "",
      email: "",
      gradeLevel: "",
      subjectInterests: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("studentRegistration", JSON.stringify(data));
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
      window.alert(
        `Registration successful!\n\n${JSON.stringify(data, null, 2)}`
      );
    }, 500);
  };

  const handleReset = () => {
    reset();
    localStorage.removeItem("studentRegistration");
  };

  return (
    <div className="App">
      <h1>Student Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="studentName">Student Name</label>
          <input
            id="studentName"
            type="text"
            placeholder="Enter your full name"
            className={errors.studentName ? "input-error" : ""}
            aria-invalid={Boolean(errors.studentName)}
            {...register("studentName", {
              required: "Student name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              validate: (value) =>
                /^[A-Za-z ]+$/.test(value.trim()) ||
                "Name can only contain letters and spaces",
            })}
          />
          {errors.studentName && (
            <p className="error-message">{errors.studentName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="example@domain.com"
            className={errors.email ? "input-error" : ""}
            aria-invalid={Boolean(errors.email)}
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="gradeLevel">Grade Level</label>
          <select
            id="gradeLevel"
            className={errors.gradeLevel ? "input-error" : ""}
            aria-invalid={Boolean(errors.gradeLevel)}
            {...register("gradeLevel", {
              required: "Please select a grade level",
            })}
          >
            <option value="">Select a grade</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
          {errors.gradeLevel && (
            <p className="error-message">{errors.gradeLevel.message}</p>
          )}
        </div>

        <fieldset>
          <legend>Subject Interests</legend>
          <div className="checkbox-group">
            {["Mathematics", "Science", "English"].map((subject) => (
              <label className="checkbox-label" key={subject}>
                <input
                  type="checkbox"
                  value={subject}
                  {...register("subjectInterests", {
                    required: "Select at least one subject",
                  })}
                />
                <span>{subject}</span>
              </label>
            ))}
          </div>
          {errors.subjectInterests && (
            <p className="error-message">
              {errors.subjectInterests.message}
            </p>
          )}
        </fieldset>

        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Registration"}
          </button>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>

  );
}

export default App; 
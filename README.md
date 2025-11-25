# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/27162eb9-c811-421a-953c-4b5fc00d814b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/27162eb9-c811-421a-953c-4b5fc00d814b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/27162eb9-c811-421a-953c-4b5fc00d814b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

# Detailed System Documentation

## Project Overview

This project is a health hub system designed to manage patient care, medication, and healthcare provider interactions. It features multiple user roles such as doctor, admin, patient, pharmacist, and owner, each with tailored dashboards and workflows.

## System Roles and Features

- **Doctor:** Manages patient examinations, diagnoses, and prescribes medication. The doctor dashboard provides quick access to patients, schedules, and medical records.
- **Admin:** Handles patient registration, queue management, payment processing, and reports.
- **Patient:** Accesses personal health data, books appointments, views medical records, and medication reminders.
- **Pharmacist:** Manages inventory, prescriptions, and pharmacy reports.
- **Owner:** Monitors analytics, reports, and revenue management.

## Doctor Dashboard Flow

The doctor dashboard presents an overview of patients scheduled for the day, current patients, and quick navigation to patient lists and medical records.

- The **Current Patient** card allows the doctor to start an examination by clicking "Mulai Periksa" (Start Examination).
- The **Jadwal Hari Ini** (Today's Schedule) lists patients with their appointment times and status.
- The **Daftar Pasien** (Patient List) and **Rekam Medis** (Medical Records) provide access to respective overviews.

## Patient Examination Screen

A dedicated examination screen is provided for doctors to perform patient diagnosis and prescribe medications.

- Accessed via the dashboard's start examination button or from the patient list.
- Contains input areas for entering diagnosis details and prescription instructions.
- A save button to submit the information and return to the dashboard.
- This screen enables a smooth and focused clinical workflow.

## Navigation and Flow Improvements

- Patient list cards link to examination screens directly.
- Medical records page includes navigation links to dashboard and patient lists.
- The system ensures intuitive movement between schedules, patient data, examinations, and records.

## How to Run and Develop

To run and develop this project locally, ensure you have Node.js and npm installed, then:

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000) to access the app.

## Technologies Used

- Vite
- React with TypeScript
- shadcn-ui components
- Tailwind CSS
- React Router Dom for navigation

## Deployment

You can deploy your application using the Lovable platform at [Lovable Project](https://lovable.dev/projects/27162eb9-c811-421a-953c-4b5fc00d814b), which supports easy sharing and custom domain configuration.

---

*This documentation is automatically updated to reflect the current system flow and components.*
npm run dev
"# SAD-KlinikSentosha" 

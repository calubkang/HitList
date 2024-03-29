# HitList

All of your job search resources in one place

## Motivation

 As someone who struggled and continues to struggle to find a software engineer position in this market, I wanted to create an app that would help me keep track of every application I've sent out in a way that allows me to focus on my studies instead of the job hunt. Before HitList, all of my tailored resumes were scattered around in my downloads folder and every time I would get an interview, I would have to visit the company website and search for the specific job posting to review it. With around a hundred applications and a specifically tailored resume for each application, I needed a way to organize all of my files including my resumes and respective job descriptions. Not only did I need to organize my files, I needed to keep track of the status of each application (Not yet applied, applied, interview scheduled, interviews finished, etc) in order to determine which applications to prioritize and which resumes/job descriptions to focus on during my interview preparations. With that, HitList was created.

 ## Description

 HitList is a full-stack web app that utilizes React, Bootstrap, and Axios for client side and Node.js, Express, and MongoDB for server side. The user begins by creating a profile. Once logged in, the user can input the details of a job opening (Company, Position, Point of Contact, Contact's email). Once the user applies for that position, there is an option for uploading a resume and job description. Once uploaded, the position is moved from 'Need to apply' to 'Waiting to Hear Back'. Once the user receives a response from the company, the user can either click 'Got the Interview', which would move the application to the 'Interview Prep' category, or delete the application depending on the company's decision. After the interviews are finished, the user can click 'Finished Interviews' and the application will be moved to the 'Waiting for final decision' category. The most helpful part of Hitlist for me was the 'Interview Prep' category and having all my materials ready at the click of a mouse. With the aesthetic and straightforward nature of HitList, users can feel at ease even while juggling hundreds of job applications knowing that they'll have all of their important resources in a single, organized space.

 ## Features

 HitList includes the following features:

 * Ability to add and track job applications
 * File organization for resumes and job descriptions
 * Status tracking for each application (not yet applied, applied, interview scheduled, interviews finished, etc.)
 * Prioritization of applications based on status
 * User authentication

 ## Technology Stack

The HitList application uses the following technologies:

### Front-end

- React
- Axios
- BootStrap

### Back-end

- Node.js
- Express
- Mongoose
- MongoDB

## Things to Add/Update

  ### Make the Job Description window more readable
  * Currently have HitModal.js line 5 as: ```const jobDesc = hit.jobDescription.replace(/\n\n/g, "\n").replace(/\n/g, "\n-")```
  * With the current code, First line (Job Description) is not bulleted, which is good. But the next title (could be 'Qualifications', 'What You'll Bring', etc) is also bulleted. Need to find a way to bullet everything expect titles. A plus would be to bold the titles.
  * Easy fix would be to just link the job application as a whole instead of having the user copy and paste the job description.

  ### Spread Sheet view needs better indicators for categories. 
  * Can add a legend for the colors
  * Can include cattegory name on left most column

  ### Add Date of Submission
  * Still debating if this information would be necessary in the rows, or if it should be included only in the pop-out window. 

## Contributing

Contributions to HitList are welcome. To contribute, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b BRANCH_NAME`
3. Make your changes and commit them: `git commit -m 'YOUR_MESSAGE'`
4. Push to the original branch: `git push origin BRANCH_NAME`
5. Create a pull request.

## License
HitList is licensed under the MIT License.

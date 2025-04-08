# On Est Là - You've Got Mail!
![image](https://github.com/user-attachments/assets/487eeadc-5a70-422b-a88e-7f3d588f68d0)

[On Est Là](https://www.oel.world) is a web3/fashion platform from photographer [Dean Holmes](https://www.instagram.com/dah.holmes) - first and foremost a place to showcase his wonderful photo work over the last four years at NYU and looking forward, a platform for him to publish editorial content across his many worlds: style, music and web3 experience. Connecting it all is his show-up spirit, equal parts curious and mobile. I was responsible for branding, UI/UX design, databases, and the frontend for this site, more or less everything. 

## Branding + UI/UX Design
![image](https://github.com/user-attachments/assets/8e4fa9f9-65d2-4fcd-b614-7d4fe7171dde)
Given On Est La’s eventual focus upon both physical and web3 art, I chose a paper/physical media direction for the site and brand. I’ve always loved stamps in the public domain, and I think they serve great as the navigation for the site. Blog posts are memories that become polaroids, whereas large brand partnerships become slightly askew passport stamps. And the mission statement is a memo with socials on the letterhead. This is all not to mention the huge collage on the front, done by Dean himself, delivered to the front page just for you. 

## Software Engineering
![image](https://github.com/user-attachments/assets/9137a3a1-3da8-4b08-b5bc-2d40d66d9632)
This site is built on Next.JS and Tailwind, with heavy usage of Sanity to store both client uploaded content and all the scans for all the scanned physical media. Each route is almost entirely composed of images rendered from Sanity, enforcing the need for a robust server side rendering solution. There is a custom slide-show component that pre-fetches images and displays them on a separate sheet of construction paper as well as a custom credits table that links the 'signatures' to the Instagram of each person who worked on the project. 

In the future, I aim to add NFT integration as OEL scope requires, paginate both the blog and work page, and add a custom Instagram embed that utilizes paper texture. The nature of React development already reminded me of scrapbooking, and that's where I came up with the idea for this project. Go visit the website at [oel.world](https://oel.world) and follow Dean at [@onestla.world](instagram.com/@onestla.world)!

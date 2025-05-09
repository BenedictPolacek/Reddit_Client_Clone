import { Footer, FooterLink, FooterLinkGroup } from "flowbite-react";
import { HomeButton } from "./HomeButton";
import { FaGithub } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import { SiGmail } from "react-icons/si";



export default function LinkFooter() {
  return (
    <>
      <div className="h-25"></div>
      <Footer container className="fixed bottom-0 pt-5 pb-5">
        <FooterLinkGroup className="justify-center">
          <FooterLink href="https://github.com/BenedictPolacek" target="_blank" rel="noopener noreferrer"><div className="flex items-center"><h3 className="mr-1">GitHub</h3> <FaGithub/></div></FooterLink>
          <FooterLink href="https://www.linkedin.com/in/benedict-polacek/" target="_blank" rel="noopener noreferrer"> <div className="flex items-center"><h3 className="mr-1">LinkedIn</h3> <ImLinkedin/></div></FooterLink>
          <FooterLink href="mailto:polacek.benedict@gmail.com"><div className="flex items-center"><h3 className="mr-1">Gmail</h3> <SiGmail/></div></FooterLink>
        </FooterLinkGroup>
        <FooterLinkGroup className="mt-1  md:mt-0 justify-center">
          <FooterLink href="https://benedictpolacek.github.io/BenedictPolacek-Personal-Portfolio-Website/"><div className="flex items-center"><h3 className="mr-1 text-lg flex items-center">Benedict Polacek</h3> <MdAccountCircle className="h-5 w-5"/></div></FooterLink>
        </FooterLinkGroup>
      </Footer>
      <HomeButton/>
    </>
  )
}


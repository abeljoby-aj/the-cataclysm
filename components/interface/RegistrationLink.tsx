import { eventConfig } from "@/config/event";

export default function RegistrationButton() {
  return (
    <div className="konfhub">
      <a className="btn btn-primary" href={eventConfig.registrationUrl} target="_blank" rel="noopener noreferrer">
        Register Now <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

<?php
use PHPMailer\PHPMailer\{SMTP, PHPMailer};

class Mailer
{
    /**
     * @var PHPMailer
     */
    private $instance;

    /**
     * @var mixed
     */
    private $config;

    /**
     * Mailer constructor.
     * @param string $brand
     */
    public function __construct($brand = 'default')
    {
        $this->config = $GLOBALS['AIB_ENV'][$brand];

        $this->instance = new PHPMailer();
        $this->instance->IsSMTP();
        $this->instance->SMTPAuth = true;
        $this->instance->From = $this->config['from'];
        $this->instance->FromName = 'AIB Mobility';

        // Split the host into domain and port on demand
        $host = explode(':', $this->config['host']);
        if (isset($host[1])) {
            $this->instance->Host = $host[0];
            $this->instance->Port = $host[1];
        } else {
            $this->instance->Host = $this->config['host'];
        }

        // Add username and password credentials
        $this->instance->Username = $this->config['username'];
        $this->instance->Password = $this->config['password'];

        // Set security configuration
        $this->instance->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        // Enable sender debug on demand
        if ($this->config['debug']) {
            $this->instance->SMTPDebug = SMTP::DEBUG_LOWLEVEL;
            $this->instance->Debugoutput = function ($str, $level) {
                error_log("($level) " . trim($str));
            };
        }
    }

    public function send(array $array)
    {
        if (isset($array['from']) && $array['from']) {
            $this->instance->From = $array['from'];
        }

        $this->instance->Subject = $array['subject'];
        $this->instance->CharSet = 'utf-8';
        $this->instance->WordWrap = 80;
        $this->instance->IsHTML(true);
        $this->instance->SetLanguage('de');

        $this->instance->Body = $array['body'];
        $this->instance->AltBody = strip_tags($array['body']);

        if (is_array($array['to'])) {
            foreach ($array['to'] as $to) {
                $this->instance->AddAddress($to);
            }
        } else {
            $this->instance->AddAddress($array['to']);
        }

        $try = 0;
        do {
            if (($success = $this->instance->send()) == false) {
                $try++;
                sleep(2 * $try);
                error_log("Mail send retry $try");
            }
        } while (!$success && $try < 5);
        return $success;
    }
}

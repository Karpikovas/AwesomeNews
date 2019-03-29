<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 29.03.2019
 * Time: 12:32
 */

namespace App\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
        // Здесь Вы можете дополнить код своими инструкциями. Если таковые отсутствуют, метод конструктора можно опустить, он автоматически унаследуется от родителя
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }
}
<?php

namespace App\Repository;

use App\Entity\NewsPolitics;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NewsPolitics|null find($id, $lockMode = null, $lockVersion = null)
 * @method NewsPolitics|null findOneBy(array $criteria, array $orderBy = null)
 * @method NewsPolitics[]    findAll()
 * @method NewsPolitics[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsPoliticsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NewsPolitics::class);
    }

    // /**
    //  * @return NewsPolitics[] Returns an array of NewsPolitics objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NewsPolitics
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

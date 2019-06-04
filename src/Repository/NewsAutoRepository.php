<?php

namespace App\Repository;

use App\Entity\NewsAuto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NewsAuto|null find($id, $lockMode = null, $lockVersion = null)
 * @method NewsAuto|null findOneBy(array $criteria, array $orderBy = null)
 * @method NewsAuto[]    findAll()
 * @method NewsAuto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsAutoRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NewsAuto::class);
    }

    // /**
    //  * @return NewsAuto[] Returns an array of NewsAuto objects
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
    public function findOneBySomeField($value): ?NewsAuto
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

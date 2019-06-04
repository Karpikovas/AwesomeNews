<?php

namespace App\Repository;

use App\Entity\NewsSport;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NewsSport|null find($id, $lockMode = null, $lockVersion = null)
 * @method NewsSport|null findOneBy(array $criteria, array $orderBy = null)
 * @method NewsSport[]    findAll()
 * @method NewsSport[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsSportRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NewsSport::class);
    }

    // /**
    //  * @return NewsSport[] Returns an array of NewsSport objects
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
    public function findOneBySomeField($value): ?NewsSport
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

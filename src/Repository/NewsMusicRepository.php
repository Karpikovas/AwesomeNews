<?php

namespace App\Repository;

use App\Entity\NewsMusic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NewsMusic|null find($id, $lockMode = null, $lockVersion = null)
 * @method NewsMusic|null findOneBy(array $criteria, array $orderBy = null)
 * @method NewsMusic[]    findAll()
 * @method NewsMusic[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsMusicRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NewsMusic::class);
    }

    // /**
    //  * @return NewsMusic[] Returns an array of NewsMusic objects
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
    public function findOneBySomeField($value): ?NewsMusic
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
